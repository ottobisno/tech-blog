// Enable updating/deleting of blog posts that belong to the user
// profile.js in mini-project has an example for how to delete already

const blogCard = document.querySelector('#blog-card');
const blog_id = blogCard.getAttribute('data-id');

const submitCommentHandler = async (event) => {
    event.preventDefault();

    const comment_body = document.querySelector('#comment-body').value.trim();
    

    if (comment_body && blog_id) {
        const response = await fetch(`/api/comments/`, {
            method: 'POST',
            body: JSON.stringify({ comment_body, blog_id }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace(`/blog/${blog_id}`);
        } else {
            alert('Failed to create comment')
        }
    }
};

document
    .querySelector('#comment-form')
    .addEventListener('submit', submitCommentHandler);
