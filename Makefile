start:
				npx start-server & make -C frontend start
lint:
				make -C frontend lint
install:
				npm ci
build:
				npm run build