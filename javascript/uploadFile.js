var uploadFile = function () {
    var query =
        {

            "bucketname": bucketname,// amazone bucket name
            "name": fileName,//uploaded file name using html file tag
            "type": file.type,// file type
            "region": region// amazon region like us-west-2

        };

    var url = "/amazon_presigned_url";//node service url

    $http.post(url, query).success(function (data, status, headers, config, $window) {

        if (success) {

            $.ajax({
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();

                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {

                            var percentComplete = evt.loaded / evt.total;
                            percentComplete = parseInt(percentComplete * 100);

                            console.log(percentComplete);
                            if (scope != undefined) {
                                scope.percentcomplete = percentComplete;
                            }
                            // $("#percentage").html(percentComplete);
                            if (percentComplete === 100) {

                            }

                        }
                    }, false);

                    return xhr;
                },
                url: data.url,
                type: 'PUT',
                data: file,
                processData: false,
                contentType: file.type,
            }).success(function (res) {

                var filepath = "https://s3-" + region + ".amazonaws.com/" + bucketname + "/" + fileName;
                console.log(filepath);
                retfun(filepath);
            }).error(function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log(err);
                retfun("error");
            })
        }
    });
}