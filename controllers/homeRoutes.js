const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all blog posts to display on the homepage
router.get('/', async (req, res) => {
    try {
        // Get all blog posts and join with User data
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },    
            ]
        });

        // Serializing the data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Get an individual blog post by id
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment
                }
            ]
        });

        const blog = blogData.get({ plain: true });

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Get the profile page for an individual user, with authentication
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on session id
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }]
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
