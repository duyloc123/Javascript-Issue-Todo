let issueTracker = [];

const inputTitle = document.getElementById('inputIssueTitle');
const inputAuthor = document.getElementById('author-select');
const inputSeverity = document.getElementById('severity-status');
const addIssueTracker = document.getElementById('issueInputForm');
const searchBox = document.getElementById('search-box');
const sortValue = document.getElementById('sort-value');
const listIssueTracker = document.getElementById('issuesList');

// function render(container,item){
//     var htmlIndex = item.map(function(items){
//         return `<li>
//             <table>
//                 <tr>
//                     <th> Title </th>
//                     <th> Author </th>
//                     <th> Severity </th>
//                 </tr>
//                     <td> ${items.title} </td>
//                     <td> ${items.author} </td>
//                     <td> ${items.severity} </td>
//             </table>
//             <button id="btn btn--delete" class="btn btn--delete" onclick="del('${items.id}')">Delete</button>
//         </li>`;
//     });
//     const index = htmlIndex.join('');
//     container.innerHTML = index;
// };

function render(dataSource){
    listIssueTracker.innerHTML = "";
    dataSource.forEach(data => {
        const liElement = document.createElement('li');

        const tableElement = document.createElement('table');
        const trElement = document.createElement('tr');
        const thTitleElement = document.createElement('th');
        thTitleElement.innerHTML = "Title";
        const thAuthorElement = document.createElement('th');
        thAuthorElement.innerHTML = "Author";
        const thSeverityElement = document.createElement('th');
        thSeverityElement.innerHTML = "Serverity";

        const tdTittleElement = document.createElement('td');
        tdTittleElement.innerHTML = data.title;
        const tdAuthorElement = document.createElement('td');
        tdAuthorElement.innerHTML = data.author;
        const tdSeverityElement = document.createElement('td');
        tdSeverityElement.innerHTML = data.severity;

        const btnElement = document.createElement('button');
        btnElement.setAttribute('class','btn btn--delete');
        btnElement.innerHTML="Delete";
        btnElement.addEventListener('click',() => del(data._id));

        tableElement.appendChild(trElement);

        trElement.appendChild(thTitleElement);
        trElement.appendChild(thAuthorElement);
        trElement.appendChild(thSeverityElement);

        tableElement.appendChild(tdTittleElement);
        tableElement.appendChild(tdAuthorElement);
        tableElement.appendChild(tdSeverityElement);

        liElement.appendChild(tableElement);
        liElement.appendChild(btnElement);
        listIssueTracker.appendChild(liElement);
    })
}

//  Fetch API 
    async function fetchAPI(){
        const res = await fetch("https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/todo",{
            method:"get"
        });

        const data = await res.json();
        issueTracker = data.data;
        render(issueTracker);
    }
fetchAPI();

addIssueTracker.addEventListener("submit",function(event){
    event.preventDefault();
    addIssue();
});
searchBox.addEventListener("change",function(){
    const searchValue = searchBox.value;
    if(searchValue == ""){
        render(issueTracker);
    } else {
        const filterItems = issueTracker.filter(function(items){
            return items.title === searchValue;
        });
        render(filterItems);
    }
});
    async function addIssue(){
        const addIssueTracker = {
            "data": {
                "title": inputTitle.value,
                "author": inputAuthor.value,
                "severity": inputSeverity.value,
                "description": "Lizards are a widespread group",
                "status": "new",
                "email": "tony@gmail.com"
            }
        }
        try{
            const res = await fetch("https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/todo",{
                method:"post",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(addIssueTracker)
            })
    
            const data = await res.json();
            issueTracker.push({
                title: data.data.title,
                author: data.data.author,
                severity: data.data.severity,
            })
            render(issueTracker);

        }catch(e){
            alert("Error: " + e);
        }
    }

sortValue.addEventListener("change",function(){
    if(this.value === "asc"){
        // const sortAsc = issueTracker.sort((a,b) => a.title > b.title);
        const sortAsc = issueTracker.sort((a, b) => a.title.localeCompare(b.title));
       render(sortAsc);
    } else if (this.value === "desc"){
        const sortDesc = issueTracker.sort((a,b) => b.title.localeCompare(a.title));
        render(sortDesc);
    } else {
        render(issueTracker);
    }
});

async function del(id){
    const res = await fetch(`https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/todo/${id}`,{
        method: 'delete',
    })
    try{
        const index = issueTracker.findIndex(items => items._id === id);
        issueTracker.splice(index,1);
        render(issueTracker);
    }catch(e){
        alert("Error: " + e);
    }
}