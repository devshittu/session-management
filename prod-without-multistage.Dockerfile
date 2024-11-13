FROM node:20.2.0-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
    # Allow install without lockfile, so example works even without Node.js installed locally
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .
COPY .eslintignore .
COPY .eslintrc.js .
COPY .gitignore .
COPY .hintrc .
COPY .husky .
COPY .prettierignore .
COPY .prettierrc .
COPY .storybook .
COPY jest.config.js .
COPY lint-staged.config.js .
COPY next-env.d.ts .
COPY next.config.js .
COPY postcss.config.js .
COPY tailwind.config.js .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

# Build Next.js based on the preferred package manager
RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm build; \
    else yarn build; \
    fi

# Start Next.js based on the preferred package manager
CMD \
    if [ -f yarn.lock ]; then yarn start; \
    elif [ -f package-lock.json ]; then npm run start; \
    elif [ -f pnpm-lock.yaml ]; then pnpm start; \
    else yarn start; \
    fi

# Path: new-next/prod-without-multistage.Dockerfile    