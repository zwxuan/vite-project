using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;
using System.Text;

using CodeSmith.Engine;
using SchemaExplorer;

namespace Common
{
    /// <summary>
    /// 帮助类
    /// </summary>
    public static class DbHelpter
    {
        /// <summary>
        /// 是否公共模块
        /// </summary>
        /// <param name="table">表概要</param>
        /// <returns></returns>
        public static bool IsCommonModel(TableSchema table)
        {
            bool result = false;

            return result;
        }

        /// <summary>
        /// 获取表数据库连接串名称
        /// </summary>
        /// <param name="table">表概要</param>
        /// <returns></returns>
        public static string GetDbName(TableSchema table)
        {
            string dbName = table.Database.Name;

            return dbName;
        }

        /// <summary>
        /// 获取表模块名称
        /// </summary>
        /// <param name="table">表概要</param>
        /// <returns></returns>
        public static string GetModelName(TableSchema table)
        {
            if (!table.Name.Contains("_"))
                return string.Empty;

            string modelName = table.Name.Substring(0, table.Name.IndexOf('_'));

            string result = StringUtil.ToPascalCase(modelName.ToLower());

            if (result == "Authority")
                result = "OguPermission";
				
			if (result == "Help")
                result = "HelpTip";
				
			if (result == "THEME")
                result = "Widget";

            return result;
        }

        /// <summary>
        /// 获取表类名(不带Info)
        /// </summary>
        /// <param name="table">表概要</param>
        /// <returns></returns>
        public static string GetClassName(TableSchema table)
        {
            string className = string.Empty;

            if (table.Name.EndsWith("s"))
            {
                className = table.Name.Substring(0, table.Name.Length - 1);
            }
            else
            {
                className = table.Name;
            }
            
            return StringUtil.ToPascalCase(className.ToLower()).Replace("Info", "");
        }

        /// <summary>
        /// 获得表注释信息
        /// </summary>
        /// <param name="table">表概要</param>
        /// <returns></returns>
        public static string GetClassDescription(TableSchema table)
        {
            string tableName = table.Name;

            // 使用 MySQL 的信息架构来查询表的描述
            string sql = "SELECT table_comment FROM information_schema.tables " +
                         "WHERE table_name = @TableName AND table_schema = @DatabaseName;";
                         
            using (MySqlConnection connection = new MySqlConnection(table.Database.ConnectionString))
            {
                try
                {
                    MySqlCommand cmd = new MySqlCommand();
                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = connection;
                    cmd.CommandText = sql;

                    // 将参数添加到命令，使用参数化查询以避免 SQL 注入
                    cmd.Parameters.AddWithValue("@TableName", tableName);
                    cmd.Parameters.AddWithValue("@DatabaseName", table.Database.Name); // 需要使用实际的数据库名称

                    if (connection.State != ConnectionState.Open)
                    {
                        connection.Open();
                    }
                    
                    object result = cmd.ExecuteScalar();
                    connection.Close();
                    
                    if (result != null)
                    {
                        return result.ToString().Replace("\r\n", "");
                    }
                    else
                    {
                        return tableName;
                    }
                }
                catch (SystemException ex)
                {
                    // 处理异常，最好记录日志
                    throw ex;
                }
                finally
                {
                    if (connection.State != ConnectionState.Closed)
                    {
                        connection.Close();
                    }
                }
            }
        }

        /// <summary>
        /// 获取属性类型
        /// </summary>
        /// <param name="column">列概要</param>
        /// <returns></returns>
        public static string GetPropertyType(ColumnSchema column)
        {
            if (column.Name.EndsWith("TypeCode")) return column.Name;

            return DbTypeToCSharp(column.DataType.ToString());
        }

        /// <summary>
        /// 获取属性名称
        /// </summary>
        /// <param name="column">列概要</param>
        /// <returns></returns>
        public static string GetPropertyName(ColumnSchema column)
        {
            string propertyName = column.Name;

            if (propertyName == column.Table.Name + "Name") return "Name";
            if (propertyName == column.Table.Name + "Description") return "Description";

            if (propertyName.EndsWith("TypeCode")) propertyName = propertyName.Substring(0, propertyName.Length - 4);

            return StringUtil.ToPascalCase(propertyName.ToLower());
        }
		
        /// <summary>
        /// 获取属性描述
        /// </summary>
        /// <param name="column">列概要</param>
        /// <returns></returns>
        public static string GetPropertyDescription(ColumnSchema column)
        {
            // 调试
            // System.Diagnostics.Debugger.Launch();
            // System.Diagnostics.Debugger.Break();
            string tableName = column.Table.Name;
            string columnName = column.Name;

            // 使用 MySQL 的信息架构来查询表的描述
            string sql = "SELECT column_comment FROM information_schema.columns " +
                         "WHERE table_name = @TableName AND table_schema = @DatabaseName and column_name = @ColumnName;";
                         
            using (MySqlConnection connection = new MySqlConnection(column.Database.ConnectionString))
            {
                try
                {
                    MySqlCommand cmd = new MySqlCommand();
                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = connection;
                    cmd.CommandText = sql;

                    // 将参数添加到命令，使用参数化查询以避免 SQL 注入
                    cmd.Parameters.AddWithValue("@TableName", tableName);
                    cmd.Parameters.AddWithValue("@ColumnName", columnName);
                    cmd.Parameters.AddWithValue("@DatabaseName", column.Database.Name); // 需要使用实际的数据库名称

                    if (connection.State != ConnectionState.Open)
                    {
                        connection.Open();
                    }
                    
                    object result = cmd.ExecuteScalar();
                    connection.Close();
                    
                    if (result != null)
                    {
                        return result.ToString().Replace("\r\n", "");
                    }
                    else
                    {
                        return tableName;
                    }
                }
                catch (SystemException ex)
                {
                    // 处理异常，最好记录日志
                    throw ex;
                }
                finally
                {
                    if (connection.State != ConnectionState.Closed)
                    {
                        connection.Close();
                    }
                }
            }
            //return column.Description;
        }

        /// <summary>
        /// 获取参数名称
        /// </summary>
        /// <param name="column">列概要</param>
        /// <returns></returns>
        public static string GetArgName(ColumnSchema column)
        {
            string propertyName = column.Name;

            if (propertyName == column.Table.Name + "Name") return "name";
            if (propertyName == column.Table.Name + "Description") return "description";

            if (propertyName.EndsWith("TypeCode")) propertyName = propertyName.Substring(0, propertyName.Length - 4);

            return StringUtil.ToCamelCase(propertyName.ToLower());
        }

        /// <summary>
        /// 获取参数值
        /// </summary>
        /// <param name="column">列概要</param>
        /// <returns></returns>
        public static string GetArgValue(ColumnSchema column)
        {
            string propertyValue = column.Name;

            if (GetPropertyType(column) == "string")
            {
                if (column.Name.Length > column.Size && column.Size > 0)
                    propertyValue = "\"" + column.Name.Substring(0, column.Size) + "\"";
                else
                    propertyValue = "\"" + column.Name + "\"";
            }
            else if (GetPropertyType(column) == "DateTime")
            {
                propertyValue = "DateTime.Now";
            }
			else if (GetPropertyType(column) == "bool")
            {
                propertyValue = "false";
            }
			else if (GetPropertyType(column) == "byte[]")
            {
                propertyValue = "new byte[1]";
            }
            else
            {
                propertyValue = "1";
            }

            return propertyValue;
        }

        /// <summary>
        /// 构造EFWhere条件
        /// </summary>
        /// <param name="table">表概要</param>
        /// <returns></returns>
        public static string BuildWhere(TableSchema table)
        {
            StringBuilder sb = new StringBuilder();
            if (table.PrimaryKey.MemberColumns.Count > 0)
            {
                for (int i = 0; i < table.PrimaryKey.MemberColumns.Count; i++)
                {
                    ColumnSchema column = table.PrimaryKey.MemberColumns[i];
                    if (i == 0)
                        sb.AppendFormat("p.{0}=={1}", GetPropertyName(column), GetArgName(column));
                    else
                        sb.AppendFormat(" && p.{0}=={1}", GetPropertyName(column), GetArgName(column));
                }
            }

            return sb.ToString();
        }
		
		/// <summary>
        /// 构造Keys条件
        /// </summary>
        /// <param name="table">表概要</param>
        /// <returns></returns>
        public static string BuildKeys(TableSchema table)
        {
            StringBuilder sb = new StringBuilder();
            if (table.PrimaryKey.MemberColumns.Count > 0)
            {
                for (int i = 0; i < table.PrimaryKey.MemberColumns.Count; i++)
                {
                    ColumnSchema column = table.PrimaryKey.MemberColumns[i];
                    if (i == 0)
                        sb.AppendFormat("{0}={1}", column.Name, GetArgName(column));
                    else
                        sb.AppendFormat(" , {0}={1}", column.Name, GetArgName(column));
                }
            }

            return "new { "+sb.ToString()+" }";
        }
		
		#region private utiltiy methods
	　　
		private static string DbTypeToCSharp(string dbDataType)
		{
			string result = string.Empty;
			
			switch(dbDataType)
			{
				#region 
				case "Int16":
				case "Int32":
				case "UInt16":
				case "UInt32":
					result = "int";
					break;
					
				case "Int64":
				case "UInt64":
					result = "long";
					break;
					
				case "Currency":
				case "Decimal":
				case "VarNumeric":
					result = "decimal";
					break;
					
				case "Single":
					result = "float";
					break;
					
				case "Double":
					result = "double";
					break;
					
				case "Date":
				case "DateTime":
				case "DateTime2":
					result = "DateTime";
					break;
					
				case "Time":
					result = "TimeSpan";
					break;
				
				case "Boolean":
					result = "bool";
					break;
				
				case "Binary":
					result = "byte[]";
					break;
				
				case "Byte":
					result = "byte";
					break;
				
				case "SByte":
					result = "sbyte";
					break;
					
				case "Object":
					result = "object";
					break;
					
				case "DateTimeOffset":
					result = "DateTimeOffset";
					break;
					
				case "AnsiString":
				case "AnsiStringFixedLength":
				case "String":
				case "StringFixedLength":
				case "Guid":
				case "Xml":
					result = "string";
					break;
					
				default:
					throw new System.Exception(dbDataType + "not find");
					
				#endregion
			} 
			
			return result;
		}
		
		#endregion
    }
}