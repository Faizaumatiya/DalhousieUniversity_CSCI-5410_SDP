import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import java.io.File;

/*
Reference:
[1] https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/examples-s3-objects.html
*/

public class UploadFile {
    public static void uploadObject() {
        CreateBucket cb = new CreateBucket();
        final AmazonS3 s3 = cb.connectToAWSS3();

        try {
            System.out.println("file being uploaded");
            s3.putObject("a1-serverless5410-bucket", "index.html", new File("C:\\Users\\19025\\Desktop\\Faiza\\Fall term 2022\\Serverless\\Assignments\\A1\\Submitted\\A1\\src\\main\\java\\index.html"));
        } catch (AmazonServiceException e) {
            System.err.println(e.getErrorMessage());
            System.exit(1);
        }
    }
}



