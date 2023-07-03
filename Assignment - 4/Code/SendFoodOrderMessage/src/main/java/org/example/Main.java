package org.example;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.amazonaws.services.sqs.model.SendMessageRequest;
import com.amazonaws.services.sqs.model.SendMessageResult;
import netscape.javascript.JSObject;

import java.util.Calendar;
import java.util.Date;

public class Main {
    public static void main(String[] args) {

        AWSConfiguration awsConfiguration = new AWSConfiguration();
        // AWS credentials
        BasicSessionCredentials bsc = new BasicSessionCredentials(
                awsConfiguration.AWS_ACCESS_KEY,
                awsConfiguration.AWS_SECRET_KEY,
                awsConfiguration.AWS_SESSION_TOKEN
        );
        // making String array of food dishes and customers
        String[] foodDishes= {"Pizza + Pop", "Pasta + Pop", "Pizza + Pasta", "Half moon Pizza+ Pop"};
        String[] customers = {"Faiza", "Sagar", "Swinkhal","Ariya", "Parul"};

        // Generating random values

        /* Reference:
        [1]“How to generate random numbers in Java,” Educative: Interactive Courses for
            Software Developers. [Online]. Available: https://www.educative.io/answers/how-to-
            generate-random-numbers-in-java. [Accessed: 03-Dec-2022].
        */

        int random_value1 = (int)Math.floor(Math.random()*(4-0+1)+0);
        int random_value2 =(int)Math.floor(Math.random()*(4-0+1)+0);
        int random_value3 = (int)Math.floor(Math.random()*(4-0+1)+0);

        /*Reference:
        [2]GeeksforGeeks, “Calendar getInstance() Method in Java with Examples”, GeeksforGeeks [Online].
           Available: https://www.geeksforgeeks.org/calendar-getinstance-method-in-java-with-examples/
           [Accessed: 02-Dec-2022].

        */

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DATE, (int) (Math.random()*(4-0+1)+0)+1);

        //Creating Json string
        String jsonString= "{\n\t";
        jsonString += "\"orderId\": " + random_value3 + ",";
        jsonString += "\n\t\"dish\": \"" + foodDishes[random_value1] + "\",";
        jsonString += "\n\t\"customer\": \"" + customers[random_value2] + "\",";
        jsonString += "\n\t\"time\": \"" + calendar.getTime() + "\"";
        jsonString += "\n}";

        System.out.println(jsonString);

        /* Reference:
        [3]Amazon Web Services, Inc., [Online].
           Available: https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/sqs/AmazonSQSClientBuilder.html.
           [Accessed: 03-Dec-2022].
          */

        AmazonSQS sqs = AmazonSQSClientBuilder.standard()
                .withRegion(Regions.DEFAULT_REGION)
                .withCredentials(new AWSStaticCredentialsProvider(bsc))
                .build();

        /*Reference:
        [4]Amazon Web Services, Inc., “Sending, Receiving, and Deleting Amazon SQS Messages”, Amazon Web Services, Inc.,
           2022 [Online]. Available: https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/examples-sqs-messages.html
           [Accessed: 01-Dec-2022].
         */

        SendMessageRequest messageRequest = new SendMessageRequest()
                .withQueueUrl(awsConfiguration.queueURL)
                .withMessageBody(jsonString)
                .withDelaySeconds(5);

        SendMessageResult messageResult = sqs.sendMessage(messageRequest);
        System.out.println("Message sent to SQS Queue");

    }
}