public class Main {
    public static void main(String[] args) {
        String bucket_name = "a1-serverless5410-bucket";
        System.out.format("\nCreating S3 bucket: %s\n", bucket_name);
        CreateBucket cb = new CreateBucket();
        cb.createAwsBucket(bucket_name);
        UploadFile.uploadObject();
    }
}
