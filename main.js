let issueTracker = [];

const inputTitle = document.getElementById('inputIssueTitle');
const inputAuthor = document.getElementById('author-select');
const inputSeverity = document.getElementById('severity-status');
const addIssueTracker = document.getElementById('issueInputForm');
const searchBox = document.getElementById('search-box');
const sortValue = document.getElementById('sort-value');
const listIssueTracker = document.getElementById('issuesList');

render(listIssueTracker,issueTracker);

function render(container,item){
    var htmlIndex = item.map(function(items){
        return `<li>
            <table>
                <tr>
                    <th> Title </th>
                    <th> Author </th>
                    <th> Severity </th>
                </tr>
                    <td> ${items.title} </td>
                    <td> ${items.author} </td>
                    <td> ${items.severity} </td>
            </table>
            <button id="btn btn--delete" class="btn btn--delete" onclick="del('${items.id}')">Delete</button>
        </li>`;
    });
    const index = htmlIndex.join('');
    container.innerHTML = index;
};
addIssueTracker.addEventListener("submit",function(event){
    event.preventDefault();
    var issues = {
        id: Date.now(),
        title: inputTitle.value,
        author: inputAuthor.value,
        severity: inputSeverity.value,
    };
    issueTracker.push(issues);
    render(listIssueTracker,issueTracker);
});
searchBox.addEventListener("change",function(){
    const searchValue = searchBox.value;
    if(searchValue == ""){
        render(listIssueTracker,issueTracker);
    } else {
        const filterItems = issueTracker.filter(function(items){
            return items.title === searchValue;
        });
        render(listIssueTracker,filterItems);
    }
});
sortValue.addEventListener("change",function(){
    if(this.value === "asc"){
        // const sortAsc = issueTracker.sort((a,b) => a.title > b.title);
        const sortAsc = issueTracker.sort((a, b) => a.title.localeCompare(b.title));
        render(listIssueTracker,sortAsc);
    } else if (this.value === "desc"){
        const sortDesc = issueTracker.sort((a,b) => b.title.localeCompare(a.title));
        render(listIssueTracker,sortDesc);
    } else {
        render(listIssueTracker,issueTracker)
    }
});

function del(id){
    const deleteID = issueTracker.filter((items) => items.id !== Number(id));
    issueTracker = deleteID;
    render(listIssueTracker,issueTracker);
}