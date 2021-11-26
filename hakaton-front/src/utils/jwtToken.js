import jwt_decode from 'jwt-decode';

const REMOVE_MILLISECOUNDS = 1000;

export const isTokenValid = (token) => {
    if(token === null) return false

    var decodedToken = jwt_decode(token, { complete: true });

    if (decodedToken.exp < Date.now() / REMOVE_MILLISECOUNDS) {
        return false;
    }

    return true;
};

export const hasLoggedUser = () => {
	let token = localStorage.getItem("token")

	if(token === null)
		return false
	else if(!isTokenValid(localStorage.getItem("token"))){
        deleteLocalStorage()
		return false
    }

	return true
};

function deleteLocalStorage(){
    localStorage.clear("token");
}  