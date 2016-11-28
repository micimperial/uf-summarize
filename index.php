<?php header('Access-Control-Allow-Origin: *'); ?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css">
        <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" media="screen" href="style.css">        
        <title>Uberflip Account Summary</title>
        <link rel="icon" href="/img/uberflip_icon.ico" type="image/x-icon">

    </head>

    <body>
        <nav class="navbar navbar-default">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Uberflip Summarize</a>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <form class="navbar-form navbar-left form-inline" role="search">
                        <div class="form-group">
                            <!--<label for="APIkey">API Key:</label>-->
                            <input id="APIkey" type="text" class="form-control" placeholder="API Key" value="">
                        </div>
                        <div class="form-group">
                            <!--<label for="APIsig">API Signature:</label>-->
                            <input id="APIsig" type="text" class="form-control" placeholder="API Signature" value="">
                        </div>
                        <div class="form-group">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Summarize
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a href="#" id="submitFlipBooks">FlipBooks</a></li>
                                    <li><a href="#" id="submitHubs">Hubs</a></li>
                                </ul>
                            </div>

                        </div>

                    </form>
                </div>
                <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
        </nav>
        <div class="jumbotron">
            <div class="container">
                <h1>Get it all!</h1>
                <p>Enter your API Key &amp; Signature and click "Summarize" to generate a summary.</p>
                <p><small><span class="label label-warning">Warning</span> Summarizing may take awhile.</small>
                    <br><small><span class="label label-danger">Danger</span> Each account is allowed 750 API requests/hour. Each summary makes 1 request per 50 items.</small></p>

            </div>
        </div>
        <div class="container" id="fbs">
            <div class="row">
                <h2>Flipbooks</h2>
                <h3>Your Flipbooks<a class="btn btnExport btn-default btn-xs"><i class="icon-white icon-download"></i> Download .XLS</a></h3>
            </div>
        </div>
        <div class="container" id="hubs">
            <div class="row">
                <h2>Hubs</h2>
            </div>
        </div>
        <div class="container" id="res">
            <code></code>
        </div>
        <span id="loader" class="glyphicon glyphicon-refresh spinning"></span>
        <div id="loading-overlay"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="script.js"></script>

        <script>
            $(document).ajaxStart(function () {
                $("body").addClass("loading");
            });
            $(document).ajaxStop(function () {
                $("body").removeClass("loading");
            });
        </script>

    </body>

    </html>