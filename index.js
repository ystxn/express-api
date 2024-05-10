import express from 'express';

const app = express();
app.use(express.json());

app.post('/', async ({ body }, response) => {
    console.log('Received request', body);
    const config = {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Authorization': body.token,
        },
        body: JSON.stringify(body.body),
      };
    const data = await fetch(`https://${body.domain}.orkesconductor.io${body.path}`, config)
        .then(async (response) => {
            if (response.ok) {
                if (response.headers.get('Content-Length') === '0') {
                    return new Promise((r) => r(""));
                }
                const contentType = response.headers.get('Content-type').split(';')[0];
                return contentType === 'text/plain' ? response.text() : response.json();
            } else {
                throw new Error(JSON.stringify(await response.json()));
            }
        })
        .catch((error) => console.error(error));
    console.log('Returning response', data);
    response.json(data);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
