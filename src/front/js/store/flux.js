const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			//
			login: (email, password) => {
				console.log('login done')
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': "application/json"  },
					body: JSON.stringify(
						{
							"email": email,
							"password": password
						}
					)
				};
				fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
				.then(response => {
					if(response.ok) {
						setStore({auth: true, email: email})
					} else {
						throw new Error("Email or password wrong"); 
					}
					return response.json()
				})
				.then(data => {
					localStorage.setItem("token", data.access_token)
				})
				.catch(error => {
					console.error("There was an error", error);
					setStore({ errorMessage: error.message }); 
				});
			},
			//
			verifyToken: async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (token) {
                        setStore({ auth: true });
                    } else {
                        setStore({ auth: false });
                    }
                } catch (error) {
                    console.error("Error al verificar el token:", error);
                }
            },
			//
			signup: (email, password) => {
				console.log('signup desde Flux')
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': "application/json" },
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};
				fetch(process.env.BACKEND_URL + "/api/signup", requestOptions)
					.then(response => {
						if (response.ok) {
							return response.json();
						} else {
							throw new Error("User already exists"); 
						}
					})
					.then(data => {
						setStore({ auth: true, email: email });
						localStorage.setItem("token", data.access_token);
					})
					.catch(error => {
						console.error("There was an error!", error);
						setStore({ errorMessage: error.message }); 
					});
			},
			//
			logout: () => {
				console.log("logout done")
				localStorage.removeItem("token");
				setStore({auth: false})
			},
		}
	};
};

export default getState;
