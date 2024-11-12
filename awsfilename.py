import boto3
client = boto3.client('s3')
client = client.list_objects_v2(
    Bucket = 'cletocite'
)

for key in (response['contents']):
    print(key)