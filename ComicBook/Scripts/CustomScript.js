$(document).ready(function() {
    $(".ButtonPanel").each(function() {
        $(this).append('<div class="DontFloatOverMe"></div>');
    });
});

function ShowPanel(panelName) {
    $("#" + panelName).show();
}

function HidePanel(panelName) {
    $("#" + panelName).hide();
    //Erase Fields
}

function ShowEditPanel(panelName, controlToHide, controlToShow) {
    ShowPanel(panelName);
    HidePanel(controlToHide);
    ShowPanel(controlToShow);
}

function HideEditPanel(panelName, controlToHide, controlToShow) {
    HidePanel(panelName);
    HidePanel(controlToHide);
    ShowPanel(controlToShow);
}

function ShowModal(panelName) {
    $("#" + panelName).dialog({ modal: true, resizable: false, draggable: false, title: "Add Book", width: 800, position: { my: "top", at: "top", of: window } });
}

function CloseModal(panelName) {
    $("#" + panelName).dialog("close");
}

function AddBookToInventoryFromWantList(wantId) {
    $.ajax({
        url: "WantList/RecieveWant",
        failure: function() { alert("Failure"); },
        success: GetWantListData,
        data: { wantId: wantId },
        type: "POST",
        traditional: true
    });
}

function LoadAvailableBooks(results, controlName) {
    var control = $("#" + controlName);
    control.empty();
    control.append('<option></option>');
    for (var i = 0; i < results.length; i++) {
        var book = results[i];
        control.append('<option value="' + book.Id + '">' + book.DisplayName + '</option>');
    }
}

function AddBookToWantStatus(statusId) {
    ShowModal("AddBookToStatusPanel");
    $("#wantStatusIdField").val(statusId);
    GetAvailableBooksForWants();
}

function GetAvailableBooksForWants() {
    $.ajax({
        url: "Book/GetAvailableBooks",
        success: function(results) { LoadAvailableBooks(results, "bookToAdd"); },
        failure: function() { alert("Failure"); },
        type: 'GET',
        traditional: true,
        
    });
}

function GetWantListData() {
    $.ajax({
        url: "WantList/GetWantLists",
        success: LoadWantList,
        failure: function() { alert("Failure"); },
        type: 'GET',
        traditional: true
    });
}

function LoadWantList(result) {
    $("#wantListPanel").empty();
    $("#wantListTemplate").tmpl(result).appendTo("#wantListPanel");
}

function ChangeBookWantStatus(panelName, bookId) {
    var panel = $("#" + panelName);
    var selectedStatus = panel.find("select option:selected").val();
    panel.hide();

    $.ajax({
        url: "WantList/ChangeBookWantStatus",
        success: function() { GetWantListData(); },
        failure: function() { alert("Failure"); },
        data: JSON.stringify({ bookId: bookId, wantStatusId: 4 }),
        contentType: "application/json",
        type: "POST",
        traditional: true
    });

}

function SaveBookToWantStatus() {
    var bookId = $("#bookToAdd option:selected").val();
    var wantStatusId = $("#wantStatusIdField").val();

    var request =
        {
            item:
                {
                    StatusId: wantStatusId,
                    Book:
                        {
                            Id: bookId
                        }
                }
        };

    var stringyRequest = JSON.stringify(request);

    $.ajax({
        url: "WantList/SaveBookToWant",
        failure: function() { alert("Failure"); },
        success: function() {
            GetWantListData();
            CloseModal("AddBookToStatusPanel");
        },
        data: stringyRequest,
        contentType: "application/json",
        type: "POST",
        traditional: true
    });
}

function ShowAddBookForWants() {
    LoadAddBooks(SaveBookForWants);
    $("#addBooksForWant").show();
}

function SaveBookForWants() {

    var issue = $("#bookIssueNumber").val();
    var seriesId = $("#bookSeries option:selected").val();
    var isCurrent = $("#bookIsSpecialCover").is(":checked");
    var notes = $("#bookNotes").val();

    var request =
        {
            bookToSave:
                {
                    Issue: issue,
                    Series: { Id: seriesId },
                    Notes: notes,
                    IsSpecialCover: isCurrent
                }
        };
    
    SaveNewBook(request, function() {
        GetAvailableBooksForWants();
        $("#addBooksForWant").hide();
    });
}

function SaveBookFromSearch() {
    var issue = $("#bookIssueNumber").val();
    var seriesId = $("#bookSeries option:selected").val();
    var isCurrent = $("#bookIsSpecialCover").is(":checked");
    var notes = $("#bookNotes").val();
    var wantStatusId = $("#wantStatusList option:selected").val();
    var locationId = $("#locationList option:selected").val();
    var inventoryStatusId = $("#inventoryStatusList option:selected").val();

    var request =
        {
            bookToSave:
                {
                    Issue: issue,
                    Notes: notes,
                    IsSpecialCover: isCurrent,
                    Status: inventoryStatusId,
                    Series: { Id: seriesId },
                    Want: { StatusId: wantStatusId },
                    Location: { Id: locationId }
                }
        };

    SaveNewBook(request, function() {
        ClearPage();
        SearchBooks();
    });

    $("#bookSeries").focus();
}

function SaveNewBook(request, succesFunction) {
    if (typeof succesFunction == "undefined") {
        succesFunction = function() {
        };
    }

    var stringyRequest = JSON.stringify(request);

    $.ajax({
        url: "Book/SaveBook",
        failure: function () { alert("Failure"); },
        success: succesFunction,
        data: stringyRequest,
        contentType: "application/json",
        type: "POST",
        traditional: true
    });
}

function LoadAddBooks(bookSaveFunction, templateName, templateData) {
    if (bookSaveFunction != null)
        $("#saveBookButton").click(bookSaveFunction);

    if (templateName != "" && typeof templateName != "undefined") {
        $("#addBookInsertablePanel").empty();
        $("#" + templateName).tmpl(templateData).appendTo("#addBookInsertablePanel");
    }
    
    $.ajax({
        url: "Series/GetCurrentSeries",
        success: LoadSeries,
        failure: function() { alert("Failure"); },
        type: 'GET',
        traditional: true
    });
}

function LoadSeries(result) {
    var series = result.series;
    $("#bookSeries option").each(function() { $(this).remove(); });
    $("#bookSeries").append("<option></option>");
    $("#bookSeries").append("<option>--- Add New Series ---</option>");
    $("#bookSeries").append("<option></option>");
    for (var i = 0; i < series.length; i++) {
        $("#bookSeries").append('<option value="' + series[i].Id + '">' + series[i].Name + '</option>');
    }
}

function BookSeriesChanged() {
    var seriesName = $("#bookSeries option:selected").text();
    if (seriesName == "--- Add New Series ---") {
        $("#addSeriesForBook").show();
        LoadAddSeriesForBook(SaveSeriesForBook);
        $("#seriesNameField").focus();
    }
    else {
        $("#addSeriesForBook").hide();
    }
}

function LoadAddSeriesForBook(saveFunction) {
    $("#saveSeriesButton").click(saveFunction);

    $.ajax({
        url: "Publisher/GetPublishers",
        success: function(result) {
            LoadPublishers(result, "publisherList");
        },
        failure: function() { alert("Failure"); },
        type: 'GET',
        traditional: true
    });
}

function LoadPublishers(result, controlName) {
    var control = $("#" + controlName);
    control.find("option").each(function() { $(this).remove(); });

    var publishers = result.publishers;
    control.append("<option></option>");
    for (var i = 0; i < publishers.length; i++) {
        var publisher = publishers[i];
        control.append('<option value="' + publisher.Id + '">' + publisher.Name + '</option>');
    }
}

function SaveSeriesForBook() {
    var seriesName = $("#seriesNameField").val();
    var publisherId = $("#publisherList").val();

    var request = {
        series: {
            Name: seriesName,
            IsCurrent: true,
            Publisher: {
                Id: publisherId
            }
        }
    };

    var stringyRequest = JSON.stringify(request);

    $.ajax({
        url: "Series/SaveSeries",
        failure: function() { alert("Failure"); },
        success: SaveSeriesSuccess,
        data: stringyRequest,
        contentType: "application/json",
        type: "POST",
        traditional: true
    });

}

function SearchBooks() {
    var seriesName = $("#searchSeriesNameField").val();
    var issue = $("#searchIssueNumberField").val();
    var locationId = $("#searchLocationNameList option:selected").val();

    $.ajax({
        url: "Book/SearchBooks",
        success: LoadBookSearch,
        failure: function() { alert("Failure"); },
        data: { seriesName: seriesName, issue: issue, locationId: locationId },
        type: 'GET',
        traditional: true
    });
}

function LoadBookSearch(result) {
    var books = result.returnableBooks;
    var locations = result.locations;
    var inventoryStatus = result.InventoryStatus;
    var wantStatus = result.wantStatuses;
    
    $("#bookSearchResultPanel").show();
    
    $("#bookSearchResultGrid tbody").empty();
    $("#bookSearchResultTemplate").tmpl({ Books: books, Locations: locations, InventoryStatus: inventoryStatus, WantStatuses: wantStatus }).appendTo("#bookSearchResultGrid tbody");
}

function SaveSeriesSuccess() {
    LoadAddBooks(null);
    $("#addSeriesForBook").hide();
    ClearPage();
}

function ClearPage() {
    $(".ClearablePanel").each(function() {
        $(this).find("input[type=text], input[type=hidden], textarea").each(function() { $(this).val(""); });
        $(this).find("select option:selected").each(function() { $(this).removeAttr("selected"); });
        $(this).find("input[type=checkbox]").each(function() { $(this).removeAttr("checked"); });
    });

    $(".OptionalPanel:visible").each(function() { $(this).hide(); });
}

function ClearField(controlName) {
    var control = $("#" + controlName);
    if (control.is("select") == true) {
        control.find("option:selected").removeAttr("selected");
    }
    if(control.is("input[type=text], input[type=hidden], textarea") == true) {
        control.val("");
    }
    if(control.is("input[type=checkbox]") == true) {
        control.removeAttr("checked");
    }
}

function MoveUpLocations() {
    $.ajax({
        url: "Book/MoveLocationsUp",
        success: GetBookCount,
        failure: function () { alert("Failure"); },
        type: 'post',
        traditional: true
    });
}

function MoveBook(bookId, locationId) {
    $.ajax({
        url: "Book/MoveBook",
        success: SearchBooks,
        failure: function () { alert("Failure"); },
        data: { bookId: bookId, locationId: locationId },
        type: 'post',
        traditional: true
    });
}

function ReadBook(bookId) {
    $.ajax({
        url: "Book/ReadBook",
        success: SearchBooks,
        failure: function () { alert("Failure"); },
        data: { bookId: bookId },
        type: 'post',
        traditional: true
    });
}

function MoveBookFromSearchResults(bookId) {
    var locationId = $("#searchResultLocationList" + bookId + " option:selected").val();
    MoveBook(bookId, locationId);
}


function GetSearchData() {
    $.ajax({
        url: "Book/LoadBookSearch",
        success: LoadBookSearchData,
        failure: function () { alert("Failure"); },
        type: 'GET',
        traditional: true
    });

    GetBookCount();
}

function GetBookCount() {
    $.ajax({
        url: "Book/GetBookCount",
        success: function (result) {
            $("#locationBookCountTable").empty();
            $("#locationBookCountTemplate").tmpl({ Counts: result }).appendTo("#locationBookCountTable");
        },
        failure: function () { alert("Failure"); },
        type: 'GET',
        traditional: true
    });
}

function LoadBookSearchData(result) {
    LoadAddBooks(SaveBookFromSearch, "addBookAdditionalTemplate", { WantStatuses: result.wantStatuses, Locations: result.locations, InventoryStatus: result.inventoryStatus });

    $("#locationListTemplate").tmpl({ Locations: result.locations }).appendTo("#searchLocationNameList");
}

function SaveExistingBook(rowName) {
    var row = $("#" + rowName);

    var isChecked = row.find("#isSpecialIssueCheckbox");
    alert(isChecked);
}