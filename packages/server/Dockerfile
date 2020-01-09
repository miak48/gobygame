FROM node:10

EXPOSE 8000

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#handling-kernel-signals
# https://github.com/krallin/tini
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

RUN mkdir /node
RUN chown node.node /node
USER node
COPY --chown=node:node . /node

WORKDIR /node

RUN yarn install
RUN yarn build

ENTRYPOINT [ "/tini", "-v", "--", "node", "/node/dist/index.js" ]
