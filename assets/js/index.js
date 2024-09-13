
const title = document.getElementById('title');
const author = document.getElementById('author');
const severity = document.getElementById('severity');
const description = document.getElementById('description');
const add = document.getElementById('btn--add');
const all = document.getElementById('btn--all');
const open = document.getElementById('btn--open');
const close = document.getElementById('btn--close');
const search = document.getElementById('search--description');
const sort = document.getElementById('sortValue');
const issuesList = document.getElementById('issuesList');

let issues = [  ];

// TODO: render UI list todos
function renderData(dataSource){
  issuesList.innerHTML = '';
    dataSource.forEach(data => {
      
      const divElement = document.createElement('div');
      divElement.setAttribute('class','w-full p-6 bg-white border border-gray-200 rounded-lg shadow mt-3 max-sm:mb-5');
  
      const severityElement = document.createElement('span');
      severityElement.innerHTML = data.severity;
      if(severityElement.innerHTML === 'low'){
        severityElement.setAttribute('class',"bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300");
      } else if(severityElement.innerHTML === 'medium'){
        severityElement.setAttribute('class','bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300');
      } else if(severityElement.innerHTML === 'high'){
        severityElement.setAttribute('class','bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300');
      }
  
      // Title , Status
      const flexElement = document.createElement('div');
      flexElement.setAttribute('class','flex items-center mb-2');
      const titleElement = document.createElement('h5');
      titleElement.setAttribute('class','mr-2 text-2xl font-bold tracking-tight text-gray-900')
      titleElement.innerHTML = data.title;
      const statusElement = document.createElement('span');
      statusElement.setAttribute('class','bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300');
      statusElement.innerHTML = data.status;
  
      // Description
      const descriptionElement = document.createElement('p');
      descriptionElement.setAttribute('class','mb-5 font-normal text-gray-700');
      descriptionElement.innerHTML = data.description;
  
      // Button
      const flexBtn = document.createElement('div');
      flexBtn.setAttribute('class','flex justify-between');
  
      // Profile Image
      const flexItem = document.createElement('div');
      flexItem.setAttribute('class','flex items-center');
      const image = document.createElement('img');
      image.setAttribute('class','w-10 h-10 rounded-full mr-2');
      image.setAttribute('src','https://flowbite.com/docs/images/people/profile-picture-5.jpg');
      const author = document.createElement('div');
      author.innerHTML = data.author;
  
      // Button Close, Delete
      const divBtn = document.createElement('div');
      const btnClose = document.createElement('button');
      btnClose.setAttribute('class','inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mr-3 ease-in duration-300');
      btnClose.innerHTML = 'Close';
      btnClose.addEventListener('click',() => {
        const status = btnClose.innerHTML;
        if(status === 'Close'){
          statusElement.innerHTML = 'done';
          btnClose.innerHTML = "Open";
        } else {
          statusElement.innerHTML = 'new';
          btnClose.innerHTML = "Close";
        }
      })
      const btnDelete = document.createElement('button');
      btnDelete.setAttribute('class','inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 ease-in duration-300');
      btnDelete.innerHTML = 'Delete';
      btnDelete.addEventListener('click',() => delTodo(data._id));
  
      divBtn.appendChild(btnClose);
      divBtn.appendChild(btnDelete);
  
      flexItem.appendChild(image);
      flexItem.appendChild(author);
  
      flexBtn.appendChild(flexItem);
      flexBtn.appendChild(divBtn);
  
      flexElement.appendChild(titleElement);
      flexElement.appendChild(statusElement);
  
      divElement.appendChild(severityElement);
      divElement.appendChild(flexElement);
      divElement.appendChild(descriptionElement);
      divElement.appendChild(flexBtn);
  
      issuesList.appendChild(divElement);
    })
}

// Fetch API
async function fetchAPI(){
  const res = await fetch('https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/todo',{
    method: "get"
  });
  const data = await res.json();
  issues = data.data;
  renderData(issues);
}

fetchAPI();

// Add Todo
async function addTodo(){
  const issuesData = {
    "data": {
      "title": title.value,
      "author": author.value,
      "severity": severity.value,
      "description": description.value,
      "status": "new",
      "email": "tony@gmail.com"
   }
  }
  try{
    const res = await fetch('https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/todo',{
      method: 'post',
      headers:{
        "Content-type": "application/json"
      },
      body: JSON.stringify(issuesData)
    });
    const data = await res.json();
    issues.push({
      id: 1,
      title: data.data.title,
      author: data.data.author,
      severity: data.data.severity,
      description: data.data.description,
      status: data.data.status
    })
    renderData(issues);
  } catch(e){
    alert("Error: "+e);
  }
}

add.addEventListener('click',(even) =>{
  even.preventDefault();
  addTodo();
});

async function delTodo(id){
  const res = await fetch(`https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/todo/${id}`,{
    method: 'delete',
  });
  try{
    const index = issues.findIndex(items => items._id === id);
    issues.splice(index,1);
    renderData(issues);
  } catch(e){
    alert("Error,"+e);
  }
}

// All
all.addEventListener('click',() => {
  issuesList.style.display = 'block';
  fetchAPI();
})

// Search
search.addEventListener('input',() => {
  const searchTodo = search.value.toLowerCase();
  if(searchTodo == ""){
    renderData(issues);
  } else {
    const filterDescription = issues.filter(items => items.description.toLowerCase().includes(searchTodo));
    renderData(filterDescription);
  }
})

// Sort
sort.addEventListener('change',function() {
  if(this.value === 'asc'){
    const sortAsc = issues.sort((a, b) => a.title.localeCompare(b.title));
    renderData(sortAsc);
  } else if (this.value === 'desc'){
    const sortDesc = issues.sort((a,b) => b.title.localeCompare(a.title));
    console.log(sortDesc);
    renderData(sortDesc)
  } else {
    renderData(issues);
  }
})

// Open
open.addEventListener('click',() => {
  issuesList.style.display = 'block';
})

// Close
close.addEventListener('click',() => {
  issuesList.style.display = 'none';
})
