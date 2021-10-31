export default login = {
    statusBar: { barStyle: "light-content", backgroundColor: '#8ED9EC' },
    topImages: { width: "100%", height: "35%" },
    content: { height: "65%", width: "100%", alignItems: "center", paddingTop: 15 },
    body: { width: "100%", height: "70%", alignItems: "center", justifyContent: "center", flexWrap: "wrap" },
    title: { color: "#fff", fontWeight: "bold", fontSize: 20, marginTop: 30 },
    textBody: { color: "#fff", fontWeight: "bold", fontSize: 20, marginTop: 30, textAlign: 'center' },
    footerImage: { width: "100%", height: "15%", alignItems: "center", justifyContent: "center" },
    footerImageStyle: { width: 100, height: 50 },

    container: { width: "100%", height: "100%", alignItems: 'center', justifyContent: "center", backgroundColor: "#37bbe3" },
    containerLogo: { width: "100%", height: "15%", alignItems: "center", justifyContent: "flex-end", marginBottom: 15 },
    formContainer: { width: "100%", height: "50%", alignItems: "center", justifyContent: "flex-start" },
    inputMail: { height: 50, width: "80%", borderRadius: 10, backgroundColor: "#fff" },
    inputPass: { height: 50, width: "80%", backgroundColor: "#fff" },
    sendButton: { marginTop: 25, width: "80%", borderRadius: 15 },
    sendButtonProps: { icon: "send", mode: "contained", color: "#81368b" },
    cadButton: { marginTop: 5, width: "80%", borderRadius: 15 },
    cadButtonProps: { icon: "account-arrow-right-outline", mode: "contained", color: "#003380" },
    inputProps: {
        selectionColor: 'black',
        mode: 'outlined',
        theme: { roundness: 15 }
    },

    wrapper: { backgroundColor: "#37bbe3" },
    slide1: { flex: 1 }
}