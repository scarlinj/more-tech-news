async function deleteFormHandler(event) {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
    });

    if (response.ok) {
    document.location.replace('/dashboard/');
    return response.json();
    } else {
    alert(response.statusText);
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);

// Refer to upvote for how to set up delete post:

// async function upvoteClickHandler(event) {
//     event.preventDefault();

//     const id = window.location.toString().split('/')[
//         window.location.toString().split('/').length - 1
//     ];

//     const response = await fetch('/api/posts/upvote', {
//         method: 'PUT',
//         body: JSON.stringify({
//             post_id: id
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//         });
        
//         if (response.ok) {
//             return response.json();
//             document.location.reload();
//         } else {
//             alert(response.statusText);
//         }
// }
// document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);