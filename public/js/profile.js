const newFormHandler = async (event) => {
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

document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);