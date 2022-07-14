using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Text.Json.Serialization;
using WebApi.Helpers;
using WebApi.Services;

namespace WebApi
{
    public class Startup
    {
        // add services to the DI container
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>();
            services.AddCors();
            services.AddControllers().AddJsonOptions(x =>
            {
                // serialize enums as strings in api responses (e.g. Role)
                x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

                // ignore omitted parameters on models to enable optional params (e.g. User update)
                x.JsonSerializerOptions.IgnoreNullValues = true;
            });
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // configure DI for application services
            services.AddScoped<ISubjectService, SubjectService>();
            services.AddScoped<IShortageService, ShortageService>();
            services.AddScoped<IGradeService, GradeService>();
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IClassService, ClassService>();
            services.AddScoped<IClubService, ClubService>();
            services.AddScoped<INoteService, NoteService>();
            services.AddScoped<IActivityService, ActivityService>();
            services.AddScoped<IFeedbackService, FeedbackService>();
            services.AddScoped<IInformationService, InformationService>();
            services.AddScoped<IScheduleService, ScheduleService>();
            services.AddScoped<ICompetitionService, CompetitionService>();
            services.AddScoped<ITrainingService, TrainingService>();
        }

        // configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, DataContext dataContext)
        {
            dataContext.Database.Migrate();

            app.UseRouting();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            // global error handler
            app.UseMiddleware<ErrorHandlerMiddleware>();

            app.UseEndpoints(x => x.MapControllers());
        }
    }
}