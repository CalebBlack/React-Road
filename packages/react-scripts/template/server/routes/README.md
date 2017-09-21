# CREATING ROUTES

# Mapping
All routes must be linked inside either map.js or securemap.js, all routes linked in either of these files will be made available automatically through the router.js. Routes inside the securemap will automatically require validation using a pair of values from a valid token. Tokens are given when the user creates an account or logs into the server.

# Route Setup
All route HTTP methods must be functions exported inside the route, and by default must use the methods supplied to the route in order to respond to requests. Responses are formatted as JSON, and the response status will be set inside the response JSON object under the status field and will also set the appropriate HTTP status code.

# Route Methods


# Example

