//14.3.5

async function commentFormHandler(event) {
    event.preventDefault;

    const comment_text = document.querySelector("textarea[name='comment-body']").value.trim();

    const post_id = window.location.toString().split("/") [
        window.location.toString().split("/").length - 1
    ];

    if (comment_text) {
        const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            document.location.reload();
        }
        else {
            alert(response.statusText);
        }
    }
}

/* We need to declare two variables when the form is submitted: 
the post id from the URL (as we were doing earlier) and the value 
of the <textarea> element. We're console-logging both in the above 
code to ensure we got the right information. */

document.querySelector(".comment-form").addEventListener("submit", commentFormHandler);