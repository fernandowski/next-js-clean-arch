
export const checkAuth = async () => {
    const jwt = await fetch('http://localhost:3000/api/v1/user/validate-jwt', {method: 'POST', cache: 'force-cache' });
    const decoded = await jwt.json();
    return decoded;
}


