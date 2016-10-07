function getDataFromGithub(username) {
    var url = "https://api.github.com/search/issues?q=author:" + username + "+type:pr+created:2016-10-01..2016-10-31";

    var results = $("#results");
    results.html("");

    var loading = $("#loading");
    loading.css("display", "block");

    $.ajax(url, {
        success: function (data, status, jqxhr) {
            if (status == "success") {
                var total = $("#total");
                var shareText = "I have opened my " + data.items.length + ". merge request for Hacktoberfest 2016";
                var shareTwitter = $("#twitterlink");

                total.html("Total PR's: " + data.items.length);
                shareTwitter.attr("href", "/redirect?service=twitter&title=" + shareText);

                if(data.total_count!=0){
                    $.each(data.items, function (ix, item) {
                        $.ajax(item.repository_url, {
                            success: function (data2, status2, jqxhr2) {
                                results.append("<tr>" +
                                    "<td><a href='" + data2.html_url + "' target='_blank'>" + data2.name + "</a></td>" +
                                    "<td><a href='" + item.html_url + "' target='_blank'>" + item.number + "</a></td>" +
                                    "<td>" + item.title + "</td>" +
                                    "<td>" + item.created_at + "</td>" +
                                    "<td>" + (item.closed_at == null ? "open" : item.closed_at) + "</td>" +
                                    "</tr>");
                                loading.css("display", "none");
                            }
                        });
                    });
                } else {
                    results.html("<tr><td colspan='5' style='text-align: center'>No pull request made by the user.</td></tr>");
                    loading.css("display", "none");
                }    
            } else {
                results.html("<tr><td colspan='5' style='text-align: center'>No data to show</td></tr>");
                loading.css("display", "none");
            }
        },
        error: function(jqXHR, status, errorThrown){
            results.html("<tr><td colspan='5' style='text-align: center'>No data to show</td></tr>");
            loading.css("display", "none");
        }

    });
}

$(function () {
    $("#ghform").submit(function () {
        var ghuser = $("#ghuser").val();
        if (ghuser != "") {
            getDataFromGithub(ghuser);
        }
        return false;
    });
});
