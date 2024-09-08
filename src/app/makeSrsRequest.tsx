import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function makeSrsRequest(
    { path, method = 'GET', params = {}, data = {} } : any
) {
    try {
        // Get the accessToken from cookies
        const cookieStore = cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        // Set up the headers, including the Authorization header if accessToken exists
        const headers: any = {
            'Content-Type': 'application/json',
        };

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        // Make the request using axios
        const response = await axios({
            url: `https://statio.eduto.net${path}`,
            method,
            headers,
            params: {
                ...params,
                token: accessToken,
            },
            data: method !== 'GET' ? data : undefined,
        });

        // Check if the response indicates an unauthorized error
        if (response?.status === 401) {
            // Clear the cookies and redirect to the login page
            cookieStore.set('accessToken', '', { maxAge: -1 });  // Delete the accessToken cookie
            cookieStore.set('profile', '', { maxAge: -1 });  // Delete the profile cookie
            redirect('/login');
            return;
        }

        return response.data;
    } catch (error: any) {
        console.error('Server request failed:', error?.message);
        throw error;
    }
}
