# video-transcoder to transcode videos to mp4 format

Change you profile with your AWS profile and similarly stage,regions, etc in serverless.yml file

Create AWS Elastic transcoder pipeline in AWS Console

change other variables like transcoder pipeline Id, presets etc according to your required deployment parameters

# Url of frontend static file deployed on s3

http://transcoder-deployment-bucket.s3-website-us-east-1.amazonaws.com

## TO DEPLOY serverless backend

sls deploy --stage <STAGE>

# Architectural diagram:
![Video Transcode Architectural Diagram](https://user-images.githubusercontent.com/42226841/103120502-2090bc00-46a0-11eb-97c3-b191c0581458.jpeg)


