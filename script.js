$(function () {
    //Accordion For Tables
    $(document.body).on('click', 'h4', function () {
        $(this).toggleClass('open');
        $(this).next('.table').toggle(0);
    });
var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
//    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table}
    var blob = new Blob([format(template, ctx)]);
  var blobURL = window.URL.createObjectURL(blob);
    return blobURL;
  }
})()

    $(document.body).on('click', '.btnExport', function () {
        console.log('hit')
        var todaysDate = moment().format('DD-MM-YYYY');
        var html = $(this).closest('.row').html().replace('Download .XLS',"");
        var title = $(this).closest('h3').text();
        title= title.substr(0, title.length-14); 
        var blobURL = tableToExcel(html, title);
        $(this).attr('download','uberflip-'+title.replace(' ','-').toLowerCase()+'-'+todaysDate + '.xls')
        $(this).attr('href', blobURL);
    });

    function apiFailure() {
        alert('API Request Limit Reached')
    }
    $('#submitFlipBooks').on('click', function (e) {

        var titlePages, issuePages, x, y, z, currentTitleId, currentTitleName = '';
        var hubPages, streamPages, itemPages, a, b, c, d, e, f, currentHubId, currentHubName, currentStreamId, currentStreamName = '';
        var titleIds = [];
        var titleNames = [];
        var hubIds = [];
        var hubNames = [];
        var streamIds = [];
        var streamNames = [];
        $('#fbs').show();
        $('#hubs').hide();
        e.preventDefault;
        $('[id^=fb-]').remove();
        key = $('#APIkey').val();
        sig = $('#APIsig').val();
        //--Get FlipBooks--//
        $.ajax({
                type: "GET",
                url: "get.php",
                dataType: "xml",
                data: {
                    APIKey: encodeURI(key),
                    Signature: encodeURI(sig),
                    Method: "GetTitles"
                }
            })
            .done(function (x) {
                if ($('error', x).length) {
                    apiFailure()
                }
                titlePages = $('TotalPages', x).html();
                console.log(x);
                //Get Titles ID 
                for (i = 1; i <= titlePages; i++) {
                    console.log('Loop: ' + i)
                    $.ajax({
                        type: "GET",
                        url: "get.php",
                        dataType: "xml",
                        data: {
                            APIKey: encodeURI(key),
                            Signature: encodeURI(sig),
                            Method: "GetTitles",
                            Page: i,
                        }
                    }).done(function (y) {
                        if ($('error', y).length) {
                            apiFailure()
                        }
                        //Collect Title IDs in var                        
                        $('title > id', y).each(function () {
                            titleIds.push($(this).html());
                            titleNames.push($(this).siblings('title').html());
                        });
                    }).then(function () {
                        console.log(titleIds);

                        //Get Issue page ammount
                        for (i = 0; i < titleIds.length; i++) {
                            currentTitleId = titleIds[i];
                            currentTitleName = titleNames[i];
                            console.log(titleIds[i])
                            $('#fbs').append('<div id="fb-' + currentTitleId + '" class="row"><h4>' + currentTitleName + ' <small>' + currentTitleId + '</small><span class="glyphicon glyphicon-menu-right "></span></h4><table class="table table-hover"><thead><tr><th>Issue ID</th><th>Issue Name</th><th>Issue URL</th></tr></thead><tbody></tbody></table></div>');
                            (function (currentTitleId) {
                                $.ajax({
                                    type: "GET",
                                    url: "get.php",
                                    dataType: "xml",
                                    data: {
                                        APIKey: encodeURI(key),
                                        Signature: encodeURI(sig),
                                        Method: "GetTitleIssues",
                                        TitleId: currentTitleId
                                    }
                                }).done(function (z) {
                                    if ($('error', z).length) {
                                        apiFailure()
                                    }
                                    issuePages = $('TotalPages', z).html();
                                    //Get Issue IDs
                                    for (i = 1; i <= issuePages; i++) {
                                        console.log(i + ': ' + currentTitleId + '- Pages:' + issuePages);
                                        (function (currentTitleId, issuePages) {
                                            $.ajax({
                                                type: "GET",
                                                url: "get.php",
                                                dataType: "xml",
                                                data: {
                                                    APIKey: encodeURI(key),
                                                    Signature: encodeURI(sig),
                                                    Method: "GetTitleIssues",
                                                    Page: i,
                                                    TitleId: currentTitleId
                                                }
                                            }).done(function (y) {
                                                $('Issue', y).each(function () {
                                                    var issueId = $('id', this).html();
                                                    var issueName = $('name', this).html();
                                                    var issueUrl = $('url', this).html();
                                                    $('#fb-' + currentTitleId + ' tbody').append('<tr><th scope="row">' + issueId + '</th><td>' + issueName + '</td><td><a href="' + issueUrl + '" target="_blank">' + issueUrl + '</a></td></tr>')
                                                })
                                            })
                                        })(currentTitleId, issuePages);
                                    }
                                })
                            })(currentTitleId);
                        }
                    });
                }
            });

    });
    $('#submitHubs').on('click', function (e) {

        var titlePages, issuePages, x, y, z, currentTitleId, currentTitleName = '';
        var hubPages, streamPages, itemPages, a, b, c, d, e, f, currentHubId, currentHubName, currentStreamId, currentStreamName = '';
        var titleIds = [];
        var titleNames = [];
        var hubIds = [];
        var hubNames = [];
        var streamIds = [];
        var streamNames = [];
        $('#hubs').show();
        $('#fbs').hide();
        e.preventDefault;
        $('[id^=fb-]').remove();
        key = $('#APIkey').val();
        sig = $('#APIsig').val();

        //--Get Hubs--//

        $.ajax({
                type: "GET",
                url: "get.php",
                dataType: "xml",
                data: {
                    APIKey: encodeURI(key),
                    Signature: encodeURI(sig),
                    Method: "getHubs"
                }
            })
            .done(function (a) {
                if ($('error', a).length) {
                    apiFailure()
                }
                //Get Hub Pages
                hubPages = $('TotalPages', a).html();
                console.log(a);
                //For Hub Pages get Hub IDs 
                for (i = 1; i <= hubPages; i++) {
                    console.log('Loop: ' + i)
                    $.ajax({
                        type: "GET",
                        url: "get.php",
                        dataType: "xml",
                        data: {
                            APIKey: encodeURI(key),
                            Signature: encodeURI(sig),
                            Method: "GetHubs",
                            Page: i,
                        }
                    }).done(function (b) {
                        if ($('error', b).length) {
                            apiFailure()
                        }
                        $('hub > id', b).each(function () {
                            hubIds.push($(this).html());
                            hubNames.push($(this).siblings('company_name').html());
                        });
                    }).then(function () {
                        console.log(hubIds);
                        //For Hub Ids
                        for (i = 0; i < hubIds.length; i++) {
                            currentHubId = hubIds[i];
                            currentHubName = hubNames[i];
                            console.log(titleIds[i]);
                            if ($('#hub-' + currentHubId).length == 0) {
                                $('#hubs').append('<div id="hub-' + currentHubId + '" class="row"><h3>' + currentHubName + ' <small>' + currentHubId + '</small>  <a class="btn btnExport btn-default btn-xs"><i class="icon-white icon-download"></i> Download .XLS</a></h3></div>');
                            }

                            //Get Stream Pages
                            (function (currentHubId, currentHubName) {
                                $.ajax({
                                    type: "GET",
                                    url: "get.php",
                                    dataType: "xml",
                                    data: {
                                        APIKey: encodeURI(key),
                                        Signature: encodeURI(sig),
                                        Method: "GetHubStreams",
                                        HubId: currentHubId
                                    }
                                }).done(function (c) {
                                    if ($('error', c).length) {
                                        apiFailure()
                                    }

                                    streamPages = $('TotalPages', c).html();
                                    //For Stream Pages get Stream IDs
                                    for (i = 1; i <= streamPages; i++) {
                                        console.log(i + ': ' + currentHubId + '- Pages:' + streamPages);
                                        (function (currentHubId, streamPages) {
                                            $.ajax({
                                                type: "GET",
                                                url: "get.php",
                                                dataType: "xml",
                                                data: {
                                                    APIKey: encodeURI(key),
                                                    Signature: encodeURI(sig),
                                                    Method: "GetHubStreams",
                                                    Page: i,
                                                    HubId: currentHubId
                                                }
                                            }).done(function (d) {
                                                if ($('error', d).length) {
                                                    apiFailure()
                                                }

                                                //Collect Stream IDs in var                        
                                                $('HubStream > id', d).each(function () {
                                                    streamIds.push($(this).html());
                                                    streamNames.push($(this).siblings('title').html());
                                                });
                                            }).then(function () {
                                                console.log(streamIds);
                                                //Get Item page ammount
                                                for (i = 0; i < streamIds.length; i++) {
                                                    currentStreamId = streamIds[i];
                                                    currentStreamName = streamNames[i];
                                                    console.log(streamIds[i])
                                                    if ($('#stream-' + currentStreamId).length == 0) {
                                                        $('#hub-' + currentHubId).append('<div id="stream-' + currentStreamId + '"><h4>' + currentStreamName + ' <small>' + currentStreamId + '</small><span class="glyphicon glyphicon-menu-right "></span></h4><table class="table table-hover"><thead><tr><th>Item ID</th><th>Item Name</th><th>Item URL</th><th>Pub Date</th></tr></thead><tbody></tbody></table></div>');
                                                    }

                                                    (function (currentStreamId) {
                                                        $.ajax({
                                                            type: "GET",
                                                            url: "get.php",
                                                            dataType: "xml",
                                                            data: {
                                                                APIKey: encodeURI(key),
                                                                Signature: encodeURI(sig),
                                                                Method: "GetHubItems",
                                                                HubId: currentHubId,
                                                                HubStreamId: currentStreamId
                                                            }
                                                        }).done(function (e) {
                                                            if ($('error', e).length) {
                                                                apiFailure()
                                                            }

                                                            itemPages = $('TotalPages', e).html();

                                                            //For Each ItemPage Get ItemIDs
                                                            for (i = 1; i <= itemPages; i++) {
                                                                //console.log(i + ': ' + currentStreamId + '- Pages:' + itemPages);
                                                                (function (currentStreamId, itemPages) {
                                                                    $.ajax({
                                                                        type: "GET",
                                                                        url: "get.php",
                                                                        dataType: "xml",
                                                                        data: {
                                                                            APIKey: encodeURI(key),
                                                                            Signature: encodeURI(sig),
                                                                            Method: "GetHubItems",
                                                                            Page: i,
                                                                            HubId: currentHubId,
                                                                            HubStreamId: currentStreamId
                                                                        }
                                                                    }).done(function (f) {
                                                                        if ($('error', f).length) {
                                                                            apiFailure()
                                                                        }

                                                                        $('HubItem', f).each(function () {
                                                                            var itemId = $('id', this).html();
                                                                            var itemName = $('title', this).html();
                                                                            var itemUrl = $('url', this).html();
                                                                            var pubDate = $('created', this).html();
                                                                            
                                                                            console.log(currentStreamId + ' - ' + itemName);
                                                                            $('#stream-' + currentStreamId + ' tbody').append('<tr><th scope="row">' + itemId + '</th><td>' + itemName + '</td><td><a href="' + itemUrl + '" target="_blank">' + itemUrl + '</a></td><td>' + pubDate + '</td></tr>')
                                                                        })
                                                                    })
                                                                })(currentStreamId, itemPages);
                                                            }
                                                        })
                                                    })(currentStreamId);
                                                }
                                            });
                                        })(currentHubId, streamPages);
                                    }
                                })
                            })(currentHubId, currentHubName);
                        }
                    });
                }
            });
    });

});