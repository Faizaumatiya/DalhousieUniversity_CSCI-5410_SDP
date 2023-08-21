import com.amazonaws.auth.*;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.Bucket;
import java.util.List;

/*
Code Reference:
[1] https://docs.aws.amazon.com/code-samples/latest/catalog/java-s3-src-main-java-aws-example-s3-CreateBucket.java.html
For dependencies:
[2] https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/java/example_code/s3/pom.xml
Adding Bucket Policy:
[3] https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html
*/

public class CreateBucket {
    public AmazonS3 connectToAWSS3() {
        return AmazonS3ClientBuilder.standard().withRegion(Regions.DEFAULT_REGION).withCredentials(new AWSStaticCredentialsProvider(new BasicSessionCredentials(
                "ASIAYXVLDLPNFWMSTWIV",
                "/UK9lWdgccZDskNOxXLg0X14FFkLC9N1LwqRjT4u",
                "FwoGZXIvYXdzEMb//////////wEaDO/8BtP+m5CFWuvlpiLAAT1C8hOH1M69BGfEzn5pbzoJQSBZupxyh+KoU2oVVcR2FkD5U4TyLiLIJ9uOybuANiJdxhMEBYqr/iiTtlYEGrsa3T2jUWXMUYOFchrkCYngMAVhsY4+LTDPF2fi/sWsCoWo7yAgUnrJEZ+QIH4hEmk4R6BwTF4/5ixp8adoNT30XbcErksLEyT0BLgbHWYZsO0cQCXCxnV9ATUU357oGndl1iAP6fvjsoIZthPPrwbrx6R0D05mAli6yt4XTSfhuijjm5eaBjItGxVhEGKdY5x/SCUcI99L1sGWdQVikSQxaZEMsn9VbrTOgWO3ONZI2XR+v5qC"
        ))).build();
    }
    public Bucket getBucket(String bucket_name) {
        final AmazonS3 s3 = connectToAWSS3();
        Bucket named_bucket = null;
        List<Bucket> buckets = s3.listBuckets();
        for (Bucket b : buckets) {
            if (b.getName().equals(bucket_name)) {
                named_bucket = b;
            }
        }
        return named_bucket;
    }
    public Bucket createAwsBucket(String bucket_name) {
        final AmazonS3 s3 = connectToAWSS3();
        if (s3.doesBucketExistV2(bucket_name)) {
            System.out.format("Bucket %s already exists.\n", bucket_name);
            return getBucket(bucket_name);
        } else {
            try {
                return s3.createBucket(bucket_name);
            } catch (AmazonS3Exception e) {
                System.err.println(e.getErrorMessage());
                return null;
            }
        }
    }
}




