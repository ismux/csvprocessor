export const fileMock = () : File => {

    var base64 = "Tm9tYnJlO0FwZWxsaWRvcztEaXJlY2Npb24KUGVwaXRvO1BlcmV6O0MgUHJ1ZWJhIDEyMwpSdXRpbmdlcjtFc2N1ZGVybztTcHJpbmdmaWVsZA==";
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    var file = new File([bytes], "testLoad.csv", { type: "text/csv", lastModified: Date.now() })

    return file;
}