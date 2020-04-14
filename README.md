## Pre-requisites

Install Open Faas

```
git clone https://github.com/openfaas/faas &&   cd faas &&   ./deploy_stack.sh --no-auth

docker swarm init

```

### install the cli:
on mac/linux:

`curl -sL https://cli.openfaas.com | sudo sh`

on windows see [releases](https://github.com/openfaas/faas-cli/releases) to obtain the `faas-cli.exe`

Now the OpenFaas stck should be deployed locally on docker swarm. You can check out the running containers by running `docker ps`

should be similar to:

```bash

CONTAINER ID        IMAGE                                COMMAND                  CREATED             STATUS                 PORTS                                            NAMES
6413e6f4a0b7        functions/figlet:0.13.0              "fwatchdog"              3 days ago          Up 3 days (healthy)                                                     figlet.1.ne8gy153tn3th42wlzsdwt5as
4965612a0ce5        openfaas/basic-auth-plugin:0.18.13   "./handler"              3 days ago          Up 3 days                                                               func_basic-auth-plugin.1.le0vpd136ik6ciphqt0m07i4x
e112785c3b4c        nats-streaming:0.11.2                "/nats-streaming-ser…"   3 days ago          Up 3 days              4222/tcp, 8222/tcp                               func_nats.1.u8upwm4xq9w4qbynw2eco3x30
69d0dd871532        prom/prometheus:v2.11.0              "/bin/prometheus --c…"   3 days ago          Up 3 days              9090/tcp                                         func_prometheus.1.love3v2krmc7jxg9aaqv4s3hs
2ff497c67e4b        openfaas/faas-swarm:0.8.5            "./faas-swarm"           3 days ago          Up 3 days              8080/tcp                                         func_faas-swarm.1.jlg1bevqxtrb9v3ql0no4pnan
76de46aa199b        openfaas/gateway:0.18.13             "./gateway"              3 days ago          Up 3 days              8080/tcp, 8082/tcp                               func_gateway.1.k3rwtizhxl1wdqgol3qws8slc
0c9de935a42b        prom/alertmanager:v0.18.0            "/bin/alertmanager -…"   3 days ago          Up 3 days              9093/tcp                                         func_alertmanager.1.kk2cqgxk69xvc8xdhqf2gdxc2
ec4744b3efe7        portainer/portainer                  "/portainer"             12 days ago         Up 12 days             0.0.0.0:8000->8000/tcp, 0.0.0.0:9000->9000/tcp   portainer
b6c1caa5754b        mysql:5.6                            
```

## Docker Registry
Open-Faas needs a docker registry to deploy the functions and to pull images from. The fastets way to get it running locally and to see change in development mode is to run a local docker registry on the dev machine using another docker contiainer:

```
docker run -d -p 5000:5000 --restart always --name registry registry:2
```

This will run a local registry on your machine. Be sure to prefix the images with `localhost:5000/` so they are pushe do the correct registry

### Creating a new service

```
faas-cli new [service-name] --lang [template]
```

Change the image location to point to local registry (inside [service-name].yml)

```
image: ${DOCKER_USER:-localhost:5000}/[service-name]:[version]
```

