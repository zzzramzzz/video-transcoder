# video-transcoder to transcode videos to mp4 format

Change you profile with your AWS profile and similarly stage,regions, etc in serverless.yml file

Create AWS Elastic transcoder pipeline in AWS Console

change other variables like transcoder pipeline Id, presets etc according to your required deployment parameters

# Url of frontend static file deployed on s3

http://transcoder-deployment-bucket.s3-website-us-east-1.amazonaws.com

## TO DEPLOY serverless backend

sls deploy --stage <>

#Architectural diagram:
![](images/Video%20Transcode$20Architectural%20Diagram.jpeg)
