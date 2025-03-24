# Build stage (using verified Maven image)
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /workspace/app
COPY pom.xml .
COPY src src
RUN mvn clean package -DskipTests

# Run stage (optimized for Intelij)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /workspace/app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]