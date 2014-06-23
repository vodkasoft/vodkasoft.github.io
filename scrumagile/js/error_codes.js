function getError(pCode){
	switch(pCode){
		case -1:
			return "Error code indicating that an unknown error or an error unrelated to Parse occurred";
			
		case 1:
			return "Error code indicating that something has gone wrong with the server. If you get this error code, it is Parse's fault. Email feedback@parse.com to criticize us";
			
		case 100:
			return "Error code indicating the connection to the Parse servers failed";
			
		case 101:
			return "Error code indicating the specified object doesn't exist";
			
		case 102:
			return "Error code indicating you tried to query with a datatype that doesn't support it, like exact matching an array or object";
			
		case 103:
			return "Error code indicating a missing or invalid classname. Classnames are case-sensitive. They must start with a letter, and a-zA-Z0-9_ are the only valid characters";
			
		case 104:
			return "Error code indicating an unspecified object id";
			
		case 105:
			return "Error code indicating an invalid key name. Keys are case-sensitive. They must start with a letter, and a-zA-Z0-9_ are the only valid characters";
			
		case 106:
			return "Error code indicating a malformed pointer. You should not see this unless you have been mucking about changing internal Parse code";
			
		case 107:
			return "Error code indicating that badly formed JSON was received upstream. This either indicates you have done something unusual with modifying how things encode to JSON, or the network is failing badly";
			
		case 108:
			return "Error code indicating that the feature you tried to access is only available internally for testing purposes";
			
		case 109:
			return "You must call Parse.initialize before using the Parse library";
			
		case 111:
			return "Error code indicating that a field was set to an inconsistent type";
			
		case 112:
			return "Error code indicating an invalid channel name. A channel name is either an empty string (the broadcast channel) or contains only a-zA-Z0-9_ characters and starts with a letter";
			
		case 115:
			return "Error code indicating that push is misconfigured";
			
		case 116:
			return "Error code indicating that the object is too large";
			
		case 119:
			return "Error code indicating that the operation isn't allowed for clients";
			
		case 120:
			return "Error code indicating the result was not found in the cache";
			
		case 121:
			return "Error code indicating that an invalid key was used in a nested JSONObject";
			
		case 122:
			return "Error code indicating that an invalid filename was used for ParseFile. A valid file name contains only a-zA-Z0-9_. characters and is between 1 and 128 characters";
			
		case 123:
			return "Error code indicating an invalid ACL was provided";
			
		case 124:
			return "Error code indicating that the request timed out on the server. Typically this indicates that the request is too expensive to run";
			
		case 125:
			return "Error code indicating that the email address was invalid";
			
		case 138:
			return "Error code indicating that a unique field was given a value that is already taken";
			
		case 139:
			return "Error code indicating that a role's name is invalid";
			
		case 140:
			return "Error code indicating that an application quota was exceeded. Upgrade to resolve";
			
		case 141:
			return "Error code indicating that a Cloud Code script failed";
			
		case 200:
			return "Error code indicating that the username is missing or empty";
			
		case 201:
			return "Error code indicating that the password is missing or empty";
			
		case 202:
			return "Error code indicating that the username has already been taken";
			
		case 203:
			return "Error code indicating that the email has already been taken";
			
		case 204:
			return "Error code indicating that the email is missing, but must be specified";
			
		case 205:
			return "Error code indicating that a user with the specified email was not found";
			
		case 206:
			return "Error code indicating that a user object without a valid session could not be altered";
			
		case 207:
			return "Error code indicating that a user can only be created through signup";
			
		case 208:
			return "Error code indicating that an an account being linked is already linked to another user";
			
		case 250:
			return "Error code indicating that a user cannot be linked to an account because that account's id could not be found";
			
		case 251:
			return "Error code indicating that a user with a linked (e.g. Facebook) account has an invalid session";
			
		case 252:
			return "Error code indicating that a service being linked (e.g. Facebook or Twitter) is unsupported";
			
	}
}