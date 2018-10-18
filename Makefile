all: docker-build docker-push
docker-build:
	docker build -t audit-monitor .
docker-tag:
	docker tag audit-monitor:latest 303039355160.dkr.ecr.sa-east-1.amazonaws.com/audit-monitor:latest
docker-login:
	(aws ecr get-login --no-include-email --region sa-east-1)
docker-push: docker-tag docker-login
	docker push 303039355160.dkr.ecr.sa-east-1.amazonaws.com/audit-monitor:latest
docker-deploy:
	aws ecs update-service --cluster cluster-kmm --service service-audit-monitor --force-new-deployment

