FROM nvidia/cuda:10.2-base

COPY Meshroom-* /opt/Meshroom/
COPY photogrammetry /bin/photogrammetry
RUN chmod +x /bin/photogrammetry

# Enable SSH X11 forwarding, needed when the Docker image
# is run on a remote machine

RUN printf "deb http://de.archive.ubuntu.com/ubuntu bionic main amd64\n" >> /etc/apt/sources.list && apt update

RUN apt install -y ssh xauth && \
	systemctl enable ssh && \
	mkdir -p /run/sshd

RUN sed -i "s/^.*X11Forwarding.*$/X11Forwarding yes/; s/^.*X11UseLocalhost.*$/X11UseLocalhost no/; s/^.*PermitRootLogin prohibit-password/PermitRootLogin yes/; s/^.*X11UseLocalhost.*/X11UseLocalhost no/;" /etc/ssh/sshd_config
RUN echo "root:meshroom" | chpasswd

# install obj2gltf converter
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs
RUN npm install -g obj2gltf

WORKDIR /data

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]

