FROM nvidia/cuda:10.2-base
ARG meshroom_version=2021.1.0
ARG meshroom_download_link=https://tubcloud.tu-berlin.de/s/LJKcBjMLBoYX3fW/download

RUN printf "deb http://de.archive.ubuntu.com/ubuntu bionic main amd64\n" >> /etc/apt/sources.list && apt update
RUN apt install -y curl > /dev/null

#get Meshroom binaries
RUN curl -o /opt/Meshroom-${meshroom_version}.tar.gz ${meshroom_download_link} && \
 	mkdir /opt/Meshroom && tar -xf /opt/Meshroom-${meshroom_version}.tar.gz -C /opt/Meshroom --strip-components 1 && \
	rm /opt/Meshroom-${meshroom_version}.tar.gz
COPY photogrammetry /bin/photogrammetry
RUN chmod +x /bin/photogrammetry

# install image compression tool
# COPY ./jpegoptim-*.tar.gz /opt
# RUN tar xzvf jpegoptim-*.tar.gz && \
# 		cd jpegoptim-* && \
# 		./configure && \
# 		make && \
# 		make strip && \
# 		make install
# RUN rm /opt/jpegoptim-*.tar.gz
RUN apt install -y imagemagick

# copy custom meshroom graphs into meshroom image
# RUN mkdir /opt/Meshroom/graph
# COPY ./graph/* /opt/Meshroom-${meshroom_version}/graph/

# Enable SSH X11 forwarding, needed when the Docker image
# is run on a remote machine


RUN apt install -y ssh xauth > /dev/null && \
	systemctl enable ssh && \
	mkdir -p /run/sshd

RUN sed -i "s/^.*X11Forwarding.*$/X11Forwarding yes/; s/^.*X11UseLocalhost.*$/X11UseLocalhost no/; s/^.*PermitRootLogin prohibit-password/PermitRootLogin yes/; s/^.*X11UseLocalhost.*/X11UseLocalhost no/;" /etc/ssh/sshd_config
RUN echo "root:meshroom" | chpasswd

# install obj2gltf converter
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs > /dev/null
RUN npm install -g obj2gltf > /dev/null

RUN mkdir /data/cache

WORKDIR /data

EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]

