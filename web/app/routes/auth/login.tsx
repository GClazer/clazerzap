import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/utils/api";

interface LoginForm {
    email: string,
    password: string
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, formState: { errors }} = useForm<LoginForm>();
  
  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    const response = await api.post("/login", data);
    console.log(response);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
            <MessageCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">ChatApp</h1>
          <p className="text-muted-foreground mt-2">Entre na sua conta para continuar</p>
        </div>

        <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("email", { required: true })}
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                />
                {errors.email && <span className="text-sm text-red-500 absolute right-3 top-3">Obrigatório</span>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("password", { required: true })}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded border border-input" />
                <span className="text-muted-foreground">Lembrar de mim</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button onClick={handleSubmit(onSubmit)} type="submit" className="w-full h-11 text-base font-medium">
              Entrar
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-xs text-muted-foreground">
          Ao continuar, você concorda com nossos{" "}
          <Link to="/terms" className="text-primary hover:text-primary/80">
            Termos de Uso
          </Link>{" "}
          e{" "}
          <Link to="/privacy" className="text-primary hover:text-primary/80">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
