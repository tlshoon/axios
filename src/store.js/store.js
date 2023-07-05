import { create } from 'zustand';

const useStore = create(set => ({
  data: "",
  email: "",
  password: "",
  singleUser: "",
  name: "",
  job: "",
  id: "",
  list: "",
  delay: "",
  setData: (data) => set({ data }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setSingleUser: (singleUser) => set({ singleUser }),
  setName: (name) => set({ name }),
  setJob: (job) => set({ job }),
  setId: (id) => set({ id }),
  setList: (list) => set({ list }),
  setDelay: (delay) => set({ delay })
}));

export default useStore;
