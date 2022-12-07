const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newBlog);

    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete an existing blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id' });
            return;
        };

        res.status(200).json(blogData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Update an existing blog post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id' });
            return;
        };

        const newBlogData = await blogData.update({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newBlogData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;