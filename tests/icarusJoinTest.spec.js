const { test, expect } = require('@playwright/test');

test.describe('Join Icarus Server', () => {
    test('should join successfully with valid data and no password', async ({ request }) => {
        const response = await request.post('/join', {
            data: {
                characterName: 'testCharacter',
                serverAddress: '123.123.123.123:7777',
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.message).toBe('Joined server successfully');
    });

    test('should join successfully with valid data and correct password', async ({ request }) => {
        const response = await request.post('/join', {
            data: {
                characterName: 'testCharacter',
                serverAddress: '123.123.123.123:7777',
                password: 'correctpassword'
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.message).toBe('Joined server successfully');
    });

    test('should fail to join with missing data', async ({ request }) => {
        const response = await request.post('/join', {
            data: {
                characterName: '',
                serverAddress: '123.123.123.123:7777',
            }
        });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.error).toBe('Character name and server address are required');
    });

    test('should fail to join with incorrect password', async ({ request }) => {
        const response = await request.post('/join', {
            data: {
                characterName: 'testCharacter',
                serverAddress: '123.123.123.123:7777',
                password: 'wrongpassword'
            }
        });

        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        expect(responseBody.error).toBe('Invalid server password');
    });
});
