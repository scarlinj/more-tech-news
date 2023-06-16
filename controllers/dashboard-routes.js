const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) =>{
    console.log(req.session);
    // get all posts from user
    Post.findAll({
        where: {
        // use the ID from the session
        user_id: req.session.user_id
        },
        attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
            model: User,
            attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    })
        .then(dbPostData => {
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        }); 
});

router.get('/edit/:id', withAuth, (req, res) =>{
    console.log(req.session);
    // In Sequelize v5, findById() was replaced by findByPk()
    Post.findByPk(
        // use the ID of the post
        req.params.id, {
            attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    })
        .then(dbPostData => {
            // serialize data before passing to template
            // since you find one post, do not need to find all posts
            // const posts = dbPostData.map(post => dbPostData.get({ plain: true }));
            if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            res.render('edit-post', {   
                post, 
                loggedIn: true
            });
        } else {
            res.status(404).end();
        }
        })
        .catch(err => {
        // console.log(err);
        res.status(500).json(err);
        }); 
});

// router.get('/', withAuth, (req, res) =>{
//     console.log(req.session);
//     // get all comments from user
//     Comment.findById(
//         req.params.id, {
//             attributes: [
//             'id',
//             'post_url',
//             'title',
//             'created_at'
//         ],
//         where: {
//         // use the ID from the session
//         user_id: req.session.user_id
//         },
//         attributes: [
//         'id',
//         'comment_text',
//         'post_id'
//         ],
//         include: [
//         {
//             model: Comment,
//             attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//             include: {
//             model: User,
//             attributes: ['username']
//             }
//         }
//         // {
//         //     model: User,
//         //     attributes: ['username']
//         // }
//         ]
//     })
//         .then(dbCommentData => {
//         // serialize data before passing to template
//         const comments = dbCommentData.map(comment => comment.get({ plain: true }));
//         res.render('dashboard', { comments, loggedIn: true });
//         })
//         .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//         }); 
// });


module.exports = router;