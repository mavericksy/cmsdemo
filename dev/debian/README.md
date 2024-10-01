# Debian Build

Prerequisites:
 - podman 
 - mongodb
 
 `apt install -y podman`

 `podman pull docker.io/mongodb/mongodb-community-server:latest`

 `podman run --detach --name cmsdemodb -p 27017:27017 -v data:/data/db docker.io/mongodb/mongodb-community-server:latest`
