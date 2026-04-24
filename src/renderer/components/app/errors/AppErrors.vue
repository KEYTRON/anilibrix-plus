<script>
import { useToast } from 'vue-toastification'

export default {
  render: () => null,
  created () {
    const { ipcRenderer } = require('electron')
    const toast = useToast()
    ipcRenderer.on('app:error', (e, error) =>
      toast.error(typeof error === 'string' ? error : String(error))
    )
  }
}
</script>
