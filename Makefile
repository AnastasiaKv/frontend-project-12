install:
				make -C backend install && make -C frontend install
start-frontend:
				make -C frontend start
start-backend:
				make -C backend start
start:
				make start-backend & make start-frontend
lint-frontend:
				make -C frontend lint