"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const router = useRouter();

  const onSubmit = (data: LoginForm) => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const parsedUserData = JSON.parse(userData);

      if (
        data.email === parsedUserData.email &&
        data.password === parsedUserData.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/");
      } else {
        alert("Credenciais inválidas");
      }
    } else {
      alert("Usuário não encontrado");
    }
  };

  return (
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem vindo à WA Loja!</h2>
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  aria-describedby="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-danger">Email é obrigatório.</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-danger">Senha é obrigatória.</span>
                )}
              </div>

              <div className="d-grid col-12">
                <button type="submit" className="btn btn-success">
                  Entrar
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/cadastro" className="btn btn-link">
                  Não tenho cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
