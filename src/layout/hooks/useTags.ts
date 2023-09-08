import {ref, computed, getCurrentInstance} from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useTags() {
  const route = useRoute();
  const router = useRoute();
  const instance = getCurrentInstance();
}