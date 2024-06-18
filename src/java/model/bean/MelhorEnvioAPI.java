package model.bean;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import com.google.gson.JsonObject;
import java.io.IOException;

public class MelhorEnvioAPI {

    private static final String TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWUwZDA5OWZhY2JhNzE3ZTU4ZTVlNWM2N2VlZGJlZmI3YTY3Y2EzZjVkZTQ0NDA2NjdiMGVlZWY2MWVjMDE5MjNmYmNhNzBhYjE3YjBlMWUiLCJpYXQiOjE3MTg1NzQ1NzMuNzIzOTgzLCJuYmYiOjE3MTg1NzQ1NzMuNzIzOTg0LCJleHAiOjE3NTAxMTA1NzMuNzE1Njc1LCJzdWIiOiI5YzRkYWM2YS0zYWQ2LTRhNjAtYjM2Zi0yMGY1ZDY1YWViMzMiLCJzY29wZXMiOlsic2hpcHBpbmctY2FsY3VsYXRlIl19.TfEKfWdh0gpz89ySc4aLCE_He3jbOjEWhMjaMzzxPNd0Y07pH_Lew9oH7yOrbvtWv0ISpcgSQQNxjcJi8hV8-a9g0aMheGLu98FLC_SoeFjaGfT4vbrOfdMFVGuvUGVz4gUDFx1MSeHY-qDnhd3gCuVUqvBOacs_Abi_0-F8YvkRCCXYXSG54jYVncsxmZaRHEsLbFKCSZowIk9q5RntadH4OZeGDIIdfheZPAu9hf7IkElbC6LwU2PbME6PjqawaFQnN8qRPoaNN5yU089h40C4y4iAtvkRg64BdmPWwwI-5txbLLTLV4AQwfVVuYhPU4aO783zPXnCwiY5o9FIeE89qWfNhOXs9XTt0VSRifRoAWAgK1dips6yskGgXhMxfkblMFT0e7D5pFVkjxjrFoiqyZEXEBzuRbzV5KzRHm4yWnBlOOH9NYYvOTgDJ5IuxsLTW-l-mswYShEXDFY12SxcVjcRbxxGRYpy-U87m83S3e7km59GKcCjQMIpZV-M7qDS54IwxG5d3QjZ5DLUVf9ASWsgZ-uMOXBuxRY6IeziGTDkGb3kgIn2HRa7hmMjkbWtKe7nMEEsIHx7CsQc85kG41WdH5oHE3gVRb9W4yoSzfizfbWZpIZ1lsKS3MUBmJv0lKuVf4IAc_dW1Ia5c75Wu2gD7FRnIPaNhiLRQr8";
    private static final String URL_STRING = "https://www.melhorenvio.com.br/api/v2/me/shipment/calculate";
    private static final String FROM_POSTAL_CODE = "01002001"; // CEP de origem fixo
    private static final int PACKAGE_HEIGHT = 10;
    private static final int PACKAGE_WIDTH = 20;
    private static final int PACKAGE_LENGTH = 15;
    private static final double PACKAGE_WEIGHT = 1;

    public String calcularFrete(String toPostalCode) throws IOException {
        URL url = new URL(URL_STRING);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();

        con.setRequestMethod("POST");
        con.setRequestProperty("Accept", "application/json");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "Bearer " + TOKEN);
        con.setDoOutput(true);

        JsonObject data = new JsonObject();
        JsonObject from = new JsonObject();
        from.addProperty("postal_code", FROM_POSTAL_CODE);
        data.add("from", from);

        JsonObject to = new JsonObject();
        to.addProperty("postal_code", toPostalCode);
        data.add("to", to);

        JsonObject pkg = new JsonObject();
        pkg.addProperty("height", PACKAGE_HEIGHT);
        pkg.addProperty("width", PACKAGE_WIDTH);
        pkg.addProperty("length", PACKAGE_LENGTH);
        pkg.addProperty("weight", PACKAGE_WEIGHT);
        data.add("package", pkg);

        try (OutputStream os = con.getOutputStream()) {
            byte[] input = data.toString().getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        int code = con.getResponseCode();
        if (code != HttpURLConnection.HTTP_OK) {
            throw new IOException("Erro na requisição: " + code);
        }

        try (BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"))) {
            StringBuilder response = new StringBuilder();
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            return response.toString();
        }
    }
}
