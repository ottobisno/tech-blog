const newBlogForm = document.querySelector('#new-blog-card');
const newBlogBtn = document.querySelector('#new-blog-btn');
var blogID;
var blogTitle;
var blogBody;

// Collpases the 'Create New post' button and displays the form to create a new blog post
const showNewBlogFormHandler = async => {
    newBlogForm.setAttribute('style', 'display: flex');
    newBlogBtn.setAttribute('style', 'display: none')
};

// Handler for creating a new blog post
const newBlogHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const body = document.querySelector('#blog-body').value.trim();
    
    if (title && body) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create blog post');
        }
    }
};

// Handler for deleting blog posts
const blogDeleteHandler = async (event) => {
    if (event.target.hasAttribute('data-delete')) {
        const id = event.target.getAttribute('data-delete');

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete blog post');
        }
    }
};

// Handler for updating blog posts
const blogUpdateHandler = async (event) => {
    if (event.target.hasAttribute('data-update')) {

        // Assigning values to global variables
        blogID = event.target.getAttribute('data-update');
        blogTitle = event.target.getAttribute('data-title');
        blogBody = event.target.getAttribute('data-body');

        // Hiding all other blogs to focus on updating the current blog
        const allBlogCards = document.querySelectorAll('.blog-card');
        allBlogCards.forEach(card => {
            card.style.display = 'none';
        });

        // Hide button for creating a new blog post, as well as the blog post form (if open)
        newBlogBtn.setAttribute('style', 'display: none');
        newBlogForm.setAttribute('style', 'display: none');

        // Prefilling fields for updating the selected blog post
        document.querySelector('#updated-title').value = blogTitle;
        document.querySelector('#updated-body').value = blogBody;

        // Displaying the form to update the selected blog post
        document.querySelector('#update-blog-card').setAttribute('style', 'display: flex');
    }
};

const blogUpdateSubmit = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#updated-title').value.trim();
    const body = document.querySelector('#updated-body').value.trim();

    if (title && body) {
        const response = await fetch(`/api/blogs/${blogID}`, {
            method: 'PUT',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to update blog post');
        }
    }
}

newBlogBtn
    .addEventListener('click', showNewBlogFormHandler);

document
    .querySelector('#new-blog-form')
    .addEventListener('submit', newBlogHandler);

document
    .addEventListener('click', blogDeleteHandler);

document
    .addEventListener('click', blogUpdateHandler);

document
    .querySelector('#update-blog-form')
    .addEventListener('submit', blogUpdateSubmit);
