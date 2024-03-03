<svelte:head>
	<title>Contact me</title>
</svelte:head>
<body>
    <h1>Contact</h1>
    <form action="mailto:YOUR_EMAIL_ADDRESS" method="POST" enctype="text/plain">
        <label for="email">Email:
            <input type="email" id="email" name="email" required>
        </label>

        <label for="subject">Subject:
            <input type="text" id="subject" name="subject" required>
        </label>

        <label for="body">Body:
            <textarea id="body" name="body" required></textarea>
        </label>

        <button>Submit</button>
    </form>
</body>