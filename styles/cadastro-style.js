export default styles = {
    input: { height: 50, width: "100%", borderRadius: 10, backgroundColor: "#fff" },
    inputProps: {
        selectionColor: 'black',
        mode: 'flat',
        theme: { roundness: 15 }
    },
    password: { height: 50, width: "100%", backgroundColor: "#fff" },
    helperText: { fontWeight: 'bold', fontSize: 16 },
    helperProps: { type: "error", theme: { mode: "adaptive" } },
    helperPass: { fontWeight: 'bold', fontSize: 16, marginBottom: 15 },
    helperPassProps: { type: "error", theme: { mode: "adaptive" } },
    buttonView: { width: "100%", height: "5%", alignItems: "center", justifyContent: "flex-start" },
    profilePic: { width: "100%", alignItems: "center", justifyContent: "center", padding: 5 },
    camStyle: { width: "100%", height: "90%", backgroundColor: 'grey' },
    infoCam: { fontWeight: 'bold', color: 'white', fontSize: 18, backgroundColor: "#121212", width: "100%", padding: 15, opacity: 0.5, textAlign: 'center' },
    imgIdCam: { height: "70%", width: "90%", transform: [{ rotate: '90deg' }], opacity: 0.2 },
    imgSelfieCam: { height: "70%", width: "90%", opacity: 0.2 },
    takePhoto: { position: 'relative', justifyContent: "flex-end", alignItems: "center", marginBottom: 10 },
    
}