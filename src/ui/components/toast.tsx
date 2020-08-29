/* A reusable toast that displays a message at the bottom of the screen for 3s */
export function toast(message: string, duration = 3000) {
    const toast = document.createElement("ion-toast");
    toast.message = message;
    toast.duration = duration;

    document.body.appendChild(toast);
    return toast.present();
}
